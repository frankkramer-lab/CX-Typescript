/**
 * This class represents different aspect elements that can be found in an aspect
 */
export abstract class AspectElement {
  abstract parseElement(...args: any): any;
}
