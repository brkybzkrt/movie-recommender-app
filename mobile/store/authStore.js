import { create } from 'zustand'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useAuthStore = create((set) => ({
  user:null,
  token:null,
  isLoading:false,
  register: async ({username,email,password}) => {
   try {
    set({isLoading:true});

    const response = await fetch("http://127.0.0.1:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const {user,token} = await response.json();

    if(!response.ok) {
      throw new Error("Failed to register");
    }

    
    await AsyncStorage.setItem("token",token);
    await AsyncStorage.setItem("user",JSON.stringify(user));


    set({user})
    set({token})
    set({isLoading:false})

    
    return{success:true}
    
   } catch (error) {
    console.log(error)
    set({isLoading:false})
   }
  }
}))

