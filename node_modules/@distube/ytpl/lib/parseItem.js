const URL = require('url');
const UTIL = require('./util.js');

const BASE_VIDEO_URL = 'https://www.youtube.com/watch?v=';

module.exports = item => {
  const type = Object.keys(item)[0];
  if (type !== 'playlistVideoRenderer') return null;

  let info = item.playlistVideoRenderer;
  if (!info || !info.shortBylineText || info.upcomingEventData || !info.isPlayable) return null;
  const isLive = info.thumbnailOverlays.some(a =>
    a.thumbnailOverlayTimeStatusRenderer &&
    a.thumbnailOverlayTimeStatusRenderer.style === 'LIVE');
  const author = info.shortBylineText.runs[0];

  return {
    title: UTIL.parseText(info.title),
    id: info.videoId,
    shortUrl: BASE_VIDEO_URL + info.videoId,
    url: URL.resolve(BASE_VIDEO_URL, info.navigationEndpoint.commandMetadata.webCommandMetadata.url),
    author: {
      url: URL.resolve(BASE_VIDEO_URL, author.navigationEndpoint.commandMetadata.webCommandMetadata.url),
      channelID: author.navigationEndpoint.browseEndpoint.browseId,
      name: author.text,
    },
    thumbnail: info.thumbnail.thumbnails.sort((a, b) => b.width - a.width)[0].url,
    isLive,
    duration: !info.lengthText ? null : UTIL.parseText(info.lengthText),
  };
};
