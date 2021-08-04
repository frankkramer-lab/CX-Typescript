export interface NetworkInformation {
  /**
   * Name of the network
   */
  name?: string;

  /**
   * RightsHolder for this network
   */
  rightsHolder?: string;

  /**
   * Rights for this network
   */
  rights?: string;

  /**
   * Type of network
   */
  networkType?: string;

  /**
   * This network's organism
   */
  organism?: string;

  /**
   * Description of this network, possibly containing HTML markup
   */
  description?: string;

  /**
   * Original filename
   */
  originalFilename?: string;

  /**
   * UUID
   */
  uuid?: string;

  /**
   * version
   */
  version?: string;

  /**
   * author
   */
  author?: string;
}
