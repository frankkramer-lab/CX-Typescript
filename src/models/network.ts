import { Aspect } from './aspect';
import { AspectElement } from './aspect-element';
import { NumberVerification } from './number-verification';
import { Status } from './status';

/**
 * This interface represents a network ready for processing in the application
 */
export interface Network {
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
}
