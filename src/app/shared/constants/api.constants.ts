export class ApiConstants {
  public static ENV = 'live'; // 'local' or 'live'
  public static BASE_URL =
    ApiConstants.ENV === 'local' ? 'http://localhost' : 'http://164.90.214.25';
  public static AUTH_SVC_PORT = '4000';
  public static USR_SVC_PORT = '4001';
  public static CLIENT_SVC_PORT = '4002';
  public static NOTIFICATION_SVC_PORT = '4003';
  public static PAYMENT_SVC_PORT = '4004';
  public static PROJ_SVC_PORT = '4005';
  public static TASK_SVC_PORT = '4006';

  public static AUTH_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.AUTH_SVC_PORT}/authManagementService`;
  public static USR_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.USR_SVC_PORT}/userManagementService`;
  public static CLIENT_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.CLIENT_SVC_PORT}/clientManagementService`;
  public static NOTIFICATION_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.NOTIFICATION_SVC_PORT}/notificationService`;
  public static PAYMENT_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.PAYMENT_SVC_PORT}`;
  public static PROJ_MGMT_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.PROJ_SVC_PORT}/projectManagementService`;
  public static PROJ_MAIN_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.PROJ_SVC_PORT}/mainManagementService`;
  public static TASK_MGMT_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.TASK_SVC_PORT}/taskManagementService`;
  public static TASK_ANS_COL_SVC_URL = `${ApiConstants.BASE_URL}:${ApiConstants.TASK_SVC_PORT}/answerCollectionService`;
}
