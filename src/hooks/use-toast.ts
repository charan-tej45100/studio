
"use client"

import * as React from "react"
import type { ToastActionElement, ToastProps } from "@/components/ui/toast"

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type Toast = Omit<ToasterToast, "id">

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

type ToastContextType = {
  toasts: ToasterToast[]
  toast: (props: Toast) => {
    id: string
    dismiss: () => void
    update: (props: Partial<ToasterToast>) => void
  }
  dismiss: (toastId?: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(
  undefined
)

export function useToast() {
  const context = React.useContext(ToastContext)

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  return context
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, { toasts: [] })

  React.useEffect(() => {
    const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

    state.toasts.forEach((t) => {
      if (t.open === false && !toastTimeouts.has(t.id)) {
        const timeout = setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", toastId: t.id })
          toastTimeouts.delete(t.id)
        }, TOAST_REMOVE_DELAY)
        toastTimeouts.set(t.id, timeout)
      }
    })

    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout))
    }
  }, [state.toasts])

  const toast = React.useCallback((props: Toast) => {
    const id = genId()

    const update = (props: Partial<ToasterToast>) =>
      dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      })
    const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

    dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    return {
      id,
      dismiss,
      update,
    }
  }, [])

  const dismiss = React.useCallback(
    (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    []
  )

  return (
    <ToastContext.Provider
      value={{
        ...state,
        toast,
        dismiss,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}
