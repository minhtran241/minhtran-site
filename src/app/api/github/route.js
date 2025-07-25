import { userBasicInfo } from '@/common/constants/userBasic';
import client from '@/common/libs/apollo';
import { gql } from '@apollo/client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic'; // defaults to auto

export const GET = async (request) => {
  try {
    const { searchParams } = new URL(request.url);

    const username =
      searchParams.get('username') || userBasicInfo.githubUsername;
    let reposNum = 100;
    if (searchParams.get('reposNum')) {
      reposNum = parseInt(searchParams.get('reposNum'));
      if (reposNum < 1 || reposNum > 100) {
        return NextResponse.json({
          error:
            'Invalid number of repositories. Please provide a number between 1 and 100.',
        });
      }
    }

    const queryResult = await client.query({
      query: gql`
        query GetGitHubUserInfo($username: String!, $reposNum: Int) {
          user(login: $username) {
            login
            name
            bio
            company
            location
            websiteUrl
            avatarUrl
            repositories(
              first: $reposNum
              privacy: PUBLIC
              isFork: false
              orderBy: { field: PUSHED_AT, direction: DESC }
            ) {
              totalCount
              nodes {
                id
                name
                description
                url
                createdAt
                updatedAt
                pushedAt
                stargazerCount
                forkCount
                watchers {
                  totalCount
                }
                licenseInfo {
                  name
                }
                homepageUrl
                openGraphImageUrl
                primaryLanguage {
                  name
                  color
                }
                collaborators {
                  nodes {
                    name
                  }
                }
                repositoryTopics(first: 7) {
                  nodes {
                    topic {
                      name
                    }
                  }
                }
              }
            }
            followers {
              totalCount
            }
            following {
              totalCount
            }
            gists {
              totalCount
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
                colors
                weeks {
                  contributionDays {
                    contributionCount
                    color
                    date
                  }
                  firstDay
                }
                months {
                  name
                  year
                  totalWeeks
                  firstDay
                }
              }
            }
          }
          rateLimit {
            limit
            cost
            remaining
            resetAt
          }
        }
      `,
      variables: {
        username,
        reposNum,
      },
    });

    // console.error('GitHub API response:', queryResult.data);

    return NextResponse.json({
      user: queryResult.data.user,
      rateLimit: queryResult.data.rateLimit,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error);
  }
};
