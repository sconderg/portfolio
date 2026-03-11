---
title: Building a Video Feed System for E-Commerce
description: How I designed and shipped a scalable TikTok-style video feed inside an e-commerce platform — from CDN architecture to infinite scroll.
date: 2025-01-15
tags: ["react", "next.js", "architecture", "performance"]
slug: building-a-video-feed-system
---

## The Problem

The product needed short-form video content surfaced directly inside the shopping experience. Not a separate app, not an iframe — a native-feeling feed that lived alongside product listings and categories.

The challenge was making it feel fast and seamless. Video is heavy. Feeds are unpredictable. And the existing frontend wasn't built with media-first rendering in mind.

## Architecture Decisions

### CDN-First Media Delivery

Every video was served through BunnyCDN with aggressive caching and format negotiation. This meant:

- Videos were transcoded and stored in multiple resolutions
- The client requested the appropriate quality based on viewport and connection speed
- Cache headers were tuned so repeat views never hit the origin

### Feed Rendering Strategy

The feed used a virtualized list with intersection-based playback. Only the video in the viewport would play — everything else was paused and had its source unloaded to free memory.

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const video = entry.target as HTMLVideoElement;
      if (entry.isIntersecting) {
        video.play();
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  },
  { threshold: 0.7 }
);
```

### Instagram Import Pipeline

To bootstrap content, I built an automation pipeline that pulled public reels from Instagram, transcoded them, and pushed them into the feed. This gave the product team a way to populate the feed without waiting for original content.

## Results

The feed shipped with smooth scroll performance, sub-second load times for cached videos, and a content pipeline that kept the feed fresh without manual uploads. Engagement with video content increased measurably after launch.

## Key Takeaways

- **CDN behavior matters more than you think.** Getting cache invalidation and format negotiation right was half the performance win.
- **Virtualization is non-negotiable for feeds.** Without it, memory usage climbs fast on mobile devices.
- **Content pipelines are product features.** The import system was as valuable as the feed itself.
