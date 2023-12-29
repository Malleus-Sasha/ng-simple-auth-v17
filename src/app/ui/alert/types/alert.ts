import { AlertActions } from "./alert-actions";

export interface Alert {
  type: AlertActions;
  text: string;
}
