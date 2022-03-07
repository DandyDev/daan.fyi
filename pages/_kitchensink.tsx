import { GetStaticPaths, GetStaticProps } from 'next';
import { MDXComponents } from '@/components/MDXComponents';
import { MDXRemote } from 'next-mdx-remote';
import { Avatar, Flex, Heading, Text } from '@chakra-ui/react';
import DefaultLayout from '@/layouts/DefaultLayout';
import React, { ReactNode } from 'react';
import { format, parseISO } from 'date-fns';
import { getAndSerializePost, getPosts, PostData } from '@/lib/posts';
import TopicBadge from '@/components/TopicBadge';

const KitchensinkPage = ({ mdxSource, frontMatter }: PostData): ReactNode => {
    return (
        <DefaultLayout
            as="article"
            title={`${frontMatter.title} | Daan Debie`}
            date={new Date(frontMatter.publishedAt).toISOString()}
            type="article"
        >
            <Heading as="h1" size="xl">
                {frontMatter.title}
            </Heading>
            <Flex
                justify="space-between"
                align={['initial', 'center']}
                direction={['column', 'row']}
                mt={2}
                w="100%"
            >
                <Flex direction="row">
                    <Avatar src="/images/daan.png" size="xs" name="Daan Debie" mr={2} />
                    <Text fontSize="sm" mb={0}>
                        {'Daan Debie / '}
                        {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                    </Text>
                </Flex>
                <Text fontSize="sm" mb={0} color="gray.500" minWidth="100px" mt={[2, 0]}>
                    {frontMatter.readingTime}
                </Text>
            </Flex>
            <Flex direction="row" mb={4}>
                {frontMatter.topics.map((t) => (
                    <TopicBadge key={t} topic={t} />
                ))}
            </Flex>
            <MDXRemote {...mdxSource} components={MDXComponents} />
        </DefaultLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const { mdxSource, frontMatter } = await getAndSerializePost('special', '_kitchensink');
    return {
        props: {
            mdxSource,
            frontMatter,
        },
    };
};

export default KitchensinkPage;
