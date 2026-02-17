/**
 * Custom Scrollbar Component
 * Replaces native scrollbar with a glowing accent-themed scroll indicator
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { smoothScrollTo } from '../../utils/smoothScroll';

const CustomScrollbar = () => {
  const [thumbTop, setThumbTop] = useState(0);
  const [thumbHeight, setThumbHeight] = useState(0);
  const [visible, setVisible] = useState(false);
  const [dragging, setDragging] = useState(false);
  const hideTimer = useRef(null);
  const dragStart = useRef({ y: 0, scrollTop: 0 });
  const barRef = useRef(null);

  const updateThumb = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollHeight <= clientHeight) return;

    const ratio = clientHeight / scrollHeight;
    const height = Math.max(ratio * clientHeight, 40);
    const maxTop = clientHeight - height;
    const top = (scrollTop / (scrollHeight - clientHeight)) * maxTop;

    setThumbHeight(height);
    setThumbTop(top);
  }, []);

  const showBar = useCallback(() => {
    setVisible(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (!dragging) setVisible(false);
    }, 1200);
  }, [dragging]);

  useEffect(() => {
    const onScroll = () => {
      updateThumb();
      showBar();
    };

    const onResize = () => updateThumb();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    updateThumb();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      clearTimeout(hideTimer.current);
    };
  }, [updateThumb, showBar]);

  // Drag handling
  const onMouseDown = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = {
      y: e.clientY,
      scrollTop: document.documentElement.scrollTop,
    };
  }, []);

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e) => {
      const { clientHeight, scrollHeight } = document.documentElement;
      const maxScroll = scrollHeight - clientHeight;
      const maxTop = clientHeight - thumbHeight;
      const deltaY = e.clientY - dragStart.current.y;
      const scrollDelta = (deltaY / maxTop) * maxScroll;

      window.scrollTo(0, dragStart.current.scrollTop + scrollDelta);
    };

    const onMouseUp = () => {
      setDragging(false);
      hideTimer.current = setTimeout(() => setVisible(false), 1200);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, thumbHeight]);

  // Click on track to jump
  const onTrackClick = useCallback((e) => {
    if (e.target !== barRef.current && e.target !== barRef.current?.firstChild) return;
    const { clientHeight, scrollHeight } = document.documentElement;
    const maxScroll = scrollHeight - clientHeight;
    const clickY = e.clientY;
    const ratio = clickY / clientHeight;

    smoothScrollTo(ratio * maxScroll, 400);
  }, []);

  return (
    <div
      ref={barRef}
      className={`custom-scrollbar ${visible || dragging ? 'visible' : ''} ${dragging ? 'active' : ''}`}
      onClick={onTrackClick}
      onMouseEnter={() => { setVisible(true); clearTimeout(hideTimer.current); }}
      onMouseLeave={() => { if (!dragging) hideTimer.current = setTimeout(() => setVisible(false), 600); }}
    >
      <div className="custom-scrollbar-track" />
      <div
        className="custom-scrollbar-thumb"
        style={{ top: thumbTop, height: thumbHeight }}
        onMouseDown={onMouseDown}
      />
    </div>
  );
};

export default CustomScrollbar;
