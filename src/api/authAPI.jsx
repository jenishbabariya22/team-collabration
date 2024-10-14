export const register = async (email, password) => {
  // Check if user already exists
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const userExists = existingUsers.find(user => user.email === email);
  
  if (userExists) {
    throw new Error('User already exists');
  }

  // Save new user to localStorage
  const newUser = { email, password }; // You should hash passwords in a real app
  existingUsers.push(newUser);
  localStorage.setItem('users', JSON.stringify(existingUsers));

  return { data: { user: newUser } }; // Return the new user
};

export const login = async (email, password) => {
  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
  const user = existingUsers.find(user => user.email === email && user.password === password);
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  return { data: { user } }; // Return the user
};
