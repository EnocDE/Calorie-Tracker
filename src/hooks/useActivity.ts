import { useContext } from "react";
import { ActivityContext } from "../context/ActivityContext";

export default function useActivity(){
  
  if (!useContext(ActivityContext)) { 
    throw new Error('This hook must be used in ActivityProvider');
  }

  return (
    useContext(ActivityContext)
  )
}
