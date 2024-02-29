import { YoutubeUrlRegExp, VimeoUrlRegExp } from "@factly/scooter-shared-utils";

export const validateYouTubeUrl = url => {
  const match = url.match(YoutubeUrlRegExp);
  return match && `https://www.youtube.com/embed/${match[5]}`;
};

export const validateVimeoUrl = url => {
  const match = url.match(VimeoUrlRegExp);
  return match && `https://player.vimeo.com/video/${match[4]}?h=${match[5]}`;
};
