export const UrlRegExp =
  /[(http(s)?)://(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/;

export const YoutubeUrlRegExp =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

export const VimeoUrlRegExp =
  /((?:http|https):\/\/)?(www\.|player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/([^/]*)\/videos\/|(?:manage\/)?videos?\/|)(\d+)(?:(?:\/|\?h=)(\w+))?(?:|\/\?)/;
