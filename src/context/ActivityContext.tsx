import { Dispatch, ReactNode, createContext, useReducer } from "react";
import { ActivityActions, ActivityState, activityReducer, initialState } from "../reducers/activityReducer";

type ActivityProviderProps = {
  children: ReactNode
}

type ActivityContextProps = {
  state: ActivityState,
  dispatch: Dispatch<ActivityActions>
}

export const ActivityContext = createContext<ActivityContextProps>(null!)

export default function ActivityProvider({children} : ActivityProviderProps) {

  const [state, dispatch] = useReducer(activityReducer, initialState)

  return (
    <ActivityContext.Provider value={{state, dispatch}}>
      {children}
    </ActivityContext.Provider>
  )
}