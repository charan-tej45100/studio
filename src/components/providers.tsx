
"use client";

import * as React from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { 
  reducer,
  genId,
  ToastContext,
  TOAST_REMOVE_DELAY,
  type State,
  type Toast as ToastType,
  type ToasterToast 
} from "@/hooks/use-toast";

function ToastProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  React.useEffect(() => {
    const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

    state.toasts.forEach((t) => {
      if (t.open === false && !toastTimeouts.has(t.id)) {
        const timeout = setTimeout(() => {
          dispatch({ type: "REMOVE_TOAST", toastId: t.id });
          toastTimeouts.delete(t.id);
        }, TOAST_REMOVE_DELAY);
        toastTimeouts.set(t.id, timeout);
      }
    });

    return () => {
      toastTimeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [state.toasts]);

  const toast = React.useCallback(
    (props: ToastType) => {
      const id = genId();

      const update = (props: Partial<ToasterToast>) =>
        dispatch({
          type: "UPDATE_TOAST",
          toast: { ...props, id },
        });
      const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          open: true,
          onOpenChange: (open) => {
            if (!open) dismiss();
          },
        },
      });

      return {
        id,
        dismiss,
        update,
      };
    },
    []
  );

  const dismiss = React.useCallback(
    (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
    []
  );

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
  );
}


export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <ToastProvider>
                {children}
                <Toaster />
            </ToastProvider>
        </ThemeProvider>
    );
}
