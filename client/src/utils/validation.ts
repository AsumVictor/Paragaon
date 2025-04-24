export const validateEmail = (email: string): string | undefined => {
    if (!email) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return undefined;
  };
  
  export const validatePassword = (password: string): string | undefined => {
    if (!password) return 'Password is required';
    return undefined;
  };