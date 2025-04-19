import React from 'react';
import {
  FiUsers,
  FiEye,
  FiVideo,
  FiThumbsUp,
  FiClock,
  FiMessageCircle,
  FiYoutube,
  FiExternalLink
} from 'react-icons/fi';
import { BsGraphUp, BsCollectionPlay } from 'react-icons/bs';
import { RiVideoLine } from 'react-icons/ri';

function formatNumber(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  return num.toString();
}

const StudioDashboard = async () => {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = 'UC06FA8qjUoxbGhDcb95ZV-g';
  const channelUrl = `https://www.youtube.com/channel/${channelId}`;

  // Channel info
  const channelRes = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`,
    { cache: 'no-store' }
  );
  const channelData = await channelRes.json();
  const channel = channelData.items?.[0];

  // Videos list
  const videosRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`,
    { cache: 'no-store' }
  );
  const videosData = await videosRes.json();
  const videos = videosData.items || [];

  // Get video statistics for all videos
  const videoStatsPromises = videos.map(async (video) => {
    if (video.id?.videoId) {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${video.id.videoId}&key=${apiKey}`,
        { cache: 'no-store' }
      );
      const data = await res.json();
      return data.items?.[0]?.statistics || null;
    }
    return null;
  });

  const videoStats = await Promise.all(videoStatsPromises);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <RiVideoLine className="text-red-600 text-4xl mr-3" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Study Topians YouTube Channel</h1>
            <p className="text-gray-600">Education & Learning Content</p>
          </div>
        </div>
        <a
          href={channelUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FiYoutube className="mr-2" />
          Subscribe on YouTube
        </a>
      </div>

      {/* Channel Card */}
      <div className="bg-white rounded-xl shadow-lg mb-8 p-6 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
        {channel?.snippet?.thumbnails?.high?.url && (
          <img
            src={channel.snippet.thumbnails.high.url}
            alt="Channel Logo"
            className="w-24 h-24 rounded-full object-cover border-2 border-red-100 shadow-sm"
          />
        )}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800">{channel?.snippet?.title}</h2>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-gray-600 mt-3">
            <span className="flex items-center">
              <FiUsers className="mr-1" />
              {formatNumber(Number(channel?.statistics?.subscriberCount))} subscribers
            </span>
            <span className="flex items-center">
              <BsCollectionPlay className="mr-1" />
              {formatNumber(Number(channel?.statistics?.videoCount))} videos
            </span>
            <span className="flex items-center">
              <FiEye className="mr-1" />
              {formatNumber(Number(channel?.statistics?.viewCount))} views
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center text-gray-700">
            <BsGraphUp className="mr-2 text-blue-500" /> Channel Views
          </h3>
          <p className="text-2xl font-bold mt-2 text-blue-600">
            {formatNumber(Number(channel?.statistics?.viewCount))}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total lifetime views</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center text-gray-700">
            <FiUsers className="mr-2 text-green-500" /> Subscribers
          </h3>
          <p className="text-2xl font-bold mt-2 text-green-600">
            {formatNumber(Number(channel?.statistics?.subscriberCount))}
          </p>
          <p className="text-sm text-gray-500 mt-1">Total subscribers</p>
        </div>

        <div className="bg-white rounded-xl shadow p-6 hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold flex items-center text-gray-700">
            <FiThumbsUp className="mr-2 text-yellow-500" /> Engagement Rate
          </h3>
          <p className="text-2xl font-bold mt-2 text-yellow-600">
            {Math.round(
              (Number(channel?.statistics?.viewCount) /
                Number(channel?.statistics?.subscriberCount || 1)) * 100
            )}%
          </p>
          <p className="text-sm text-gray-500 mt-1">Views per subscriber</p>
        </div>
      </div>

      {/* Videos Section */}
      <div className="bg-white rounded-xl shadow-lg mb-8 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-semibold flex items-center text-gray-800">
            <FiVideo className="mr-2 text-red-500" /> Recent Videos
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {videos.map((video, index) => (
            <a
              key={video.id.videoId}
              href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block hover:bg-gray-50 transition-colors"
            >
              <div className="p-4 md:p-6 flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-48 flex-shrink-0 relative">
                  {video.snippet?.thumbnails?.high?.url && (
                    <img
                      src={video.snippet.thumbnails.high.url}
                      alt={video.snippet.title}
                      className="w-full h-full rounded-lg object-cover"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-1.5 py-0.5 rounded">
                    {video.snippet.liveBroadcastContent === 'live' ? 'LIVE' : 'VIDEO'}
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 mb-1 line-clamp-2">
                    {video.snippet?.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                    {video.snippet?.description}
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600">
                    <span className="flex items-center">
                      <FiEye className="mr-1" />
                      {formatNumber(Number(videoStats[index]?.viewCount || 0))} views
                    </span>
                    <span className="flex items-center">
                      <FiThumbsUp className="mr-1" />
                      {formatNumber(Number(videoStats[index]?.likeCount || 0))} likes
                    </span>
                    <span className="flex items-center">
                      <FiMessageCircle className="mr-1" />
                      {formatNumber(Number(videoStats[index]?.commentCount || 0))} comments
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1" />
                      {new Date(video.snippet?.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <FiExternalLink className="text-gray-400" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Channel Growth Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Channel Growth</h3>
        <div className="h-64 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg flex items-center justify-center text-gray-400">
          Analytics charts coming soon
        </div>
      </div>
    </div>
  );
};

export default StudioDashboard;