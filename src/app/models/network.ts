import { ErrorMessage } from 'cx-typescript';
import { Aspect } from './aspect';
import { AspectElement } from './aspect-element';
import { EditorConfiguration } from './editor-configuration';
import { NetworkInformation } from './network-information';
import { NumberVerification } from './number-verification';
import { Status } from './status';

/**
 * This interface represents a network ready for processing in the application
 */
export interface Network {
  networkInformation?: NetworkInformation;
  /**
   * This field number verification
   */
  numberVerification?: NumberVerification;

  /**
   * This field represent different aspects available in a CX file
   */
  aspects?: Aspect<AspectElement>[];

  /**
   * This field represents the status of the CX file
   */
  status?: Status;

  /**
   * This field represents the configuration for the monaco editor
   */
  editorOption?: EditorConfiguration;

  /**
   * This field represents error messages for a specific network
   */
   errors?: ErrorMessage[];

   showInDashboard?: boolean;
}
