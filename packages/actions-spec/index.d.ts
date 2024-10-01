/**
 * Note Actions was inspired from Solana Actions and blinks specification - v2.0
 */
/**
 * Protocol identifier for the Bitcoin Actions protocol
 */
export type BITCOIN_ACTIONS_PROTOCOL = "bitcoin-action:";

/**
 * @internal
 * Protocol identifier for the Bitcoin Payment protocol
 */
export type BITCOIN_PAYMENT_PROTOCOL = "bitcoin:";

/**
 * Protocol identifier for the Note Actions protocol
 */
export type NOTE_ACTIONS_PROTOCOL = "note-action:";

/**
 * @internal
 * Protocol identifier for the Note Payment protocol
 */
export type NOTE_PAYMENT_PROTOCOL = "note:";

/** @internal */
export type SupportedProtocols =
  | BITCOIN_ACTIONS_PROTOCOL
  | BITCOIN_PAYMENT_PROTOCOL
  | NOTE_ACTIONS_PROTOCOL
  | NOTE_PAYMENT_PROTOCOL;

/**
 * # Reserved for future use
 *
 * Response body payload sent via the Action GET Request
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ActionGetRequest {}

/**
 * Response body payload returned from the Action GET Request
 */
export interface ActionGetResponse {
  /** image url that represents the source of the action request */
  icon: string;
  /** describes the source of the action request */
  title: string;
  /** brief summary of the action to be performed */
  description: string;
  /** button text rendered to the user */
  label: string;
  /** UI state for the button being rendered to the user */
  disabled?: boolean;
  /**  */
  links?: {
    /** list of related Actions a user could perform */
    actions: LinkedAction[];
  };
  /** non-fatal error message to be displayed to the user */
  error?: ActionError;
}

/**
 * Related action on a single endpoint
 */
export interface LinkedAction {
  /** URL endpoint for an action */
  href: string;
  /** button text rendered to the user */
  label: string;
  /** parameters used to accept user input within an action */
  parameters?: ActionParameter[];
}

/**
 * Parameter to accept user input within an action
 */
export interface ActionParameter {
  /** parameter name in url */
  name: string;
  /** placeholder text for the user input field */
  label?: string;
  /** declare if this field is required (defaults to `false`) */
  required?: boolean;
}

/**
 * Response body payload sent via the Action POST Request
 */
export interface ActionPostRequest {
  /** public key of an account that may sign the transaction */
  account: string;
  /** unique ID of the wallet */
  walletId?: string;
  /** main address of the wallet */
  address?: string;
  /** NOTE protocol token address of the wallet */
  tokenAddress?: string;
}

/**
 * Response body payload returned from the Action POST Request
 */
export interface ActionPostResponse {
  /** hex encoded serialized transaction */
  psbtHex?: string;
  /** describes the nature of the transaction */
  message?: string;
  /** method to be used for the transaction or message, defaults to `sign` */
  method?: "sign" | "finish";
  /** msgpack encoded serialized note payload */
  payload?: string;
  /** note utxos to be spent */
  noteUtxo?: any;
  /** note outputs to be created */
  extOutputs?: Array<any>;
  /** callback URL to be invoked after the transaction is signed, using the `POST` method */
  callback?: string;
  /** non-fatal error message to be displayed to the user */
  error?: ActionError;
}

/**
 * Error message that can be returned from an Actions API
 */
export interface ActionError {
  /** non-fatal error message to be displayed to the user */
  message: string;
}
