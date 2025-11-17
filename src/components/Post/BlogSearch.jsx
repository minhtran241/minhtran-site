'use client';

import { useState } from 'react';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import PostCard from './postCard/postCard';

const POSTS_PER_PAGE = 9;

const BlogSearch = ({ posts }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Search posts
  const searchedPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    return matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(searchedPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = searchedPosts.slice(startIndex, endIndex);

  // Reset to page 1 when search changes
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className='space-y-8'>
      {/* Search Bar */}
      <label className='input input-bordered flex w-full items-center gap-2'>
        <FontAwesomeIcon
          icon='fa-duotone fa-magnifying-glass'
          className='text-base-content/50'
        />
        <input
          type='text'
          placeholder='Search blogs by title, description, or tags...'
          value={searchQuery}
          onChange={handleSearchChange}
          className='grow'
        />
        {searchQuery && (
          <button
            onClick={() => {
              setSearchQuery('');
              setCurrentPage(1);
            }}
            className='flex items-center'
          >
            <FontAwesomeIcon
              icon='fa-duotone fa-circle-xmark'
              className='text-base-content/50 hover:text-base-content transition-colors'
            />
          </button>
        )}
      </label>

      {/* Results Count */}
      <div className='flex items-center justify-between'>
        <p className='text-base-content/70 text-sm'>
          {searchedPosts.length === 0 ? (
            <span>No posts found</span>
          ) : (
            <span>
              Showing{' '}
              <span className='font-semibold'>
                {startIndex + 1}-{Math.min(endIndex, searchedPosts.length)}
              </span>{' '}
              of <span className='font-semibold'>{searchedPosts.length}</span>{' '}
              {searchedPosts.length === 1 ? 'post' : 'posts'}
              {searchQuery && (
                <>
                  {' '}
                  matching{' '}
                  <span className='font-semibold'>"{searchQuery}"</span>
                </>
              )}
            </span>
          )}
        </p>
      </div>

      {/* Posts Grid */}
      {searchedPosts.length === 0 ? (
        <div className='text-base-content/60 flex flex-col items-center justify-center py-16 text-center'>
          <FontAwesomeIcon
            icon='fa-duotone fa-magnifying-glass'
            className='text-base-content/30 mb-4 text-5xl'
          />
          <p className='mb-2 text-lg font-semibold'>No posts found</p>
          <p className='text-sm'>
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      ) : (
        <>
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {currentPosts.map((post, index) => (
              <PostCard key={index} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className='flex justify-center'>
              <div className='join'>
                <button
                  className='join-item btn'
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  «
                </button>
                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;
                  // Show first page, last page, current page, and pages around current
                  if (
                    page === 1 ||
                    page === totalPages ||
                    (page >= currentPage - 1 && page <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={page}
                        className={`join-item btn ${
                          currentPage === page ? 'btn-active' : ''
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    );
                  } else if (
                    page === currentPage - 2 ||
                    page === currentPage + 2
                  ) {
                    return (
                      <button key={page} className='join-item btn btn-disabled'>
                        ...
                      </button>
                    );
                  }
                  return null;
                })}
                <button
                  className='join-item btn'
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  »
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default BlogSearch;
