// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useCallback} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {fetchAndSwitchToThread} from '@actions/remote/thread';
import CompassIcon from '@components/compass_icon';
import {SEARCH} from '@constants/screens';
import {useServerUrl} from '@context/server';
import {preventDoubleTap} from '@utils/tap';
import {makeStyleSheetFromTheme} from '@utils/theme';

import type PostModel from '@typings/database/models/servers/post';

type HeaderReplyProps = {
    commentCount: number;
    location: string;
    post: PostModel;
    theme: Theme;
}

const getStyleSheet = makeStyleSheetFromTheme((theme: Theme) => {
    return {
        replyWrapper: {
            flex: 1,
            justifyContent: 'flex-end',
        },
        replyIconContainer: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'flex-end',
            minWidth: 40,
            paddingTop: 2,
            paddingBottom: 10,
            flex: 1,
        },
        replyText: {
            fontSize: 12,
            marginLeft: 2,
            marginTop: 2,
            color: theme.linkColor,
        },
    };
});

const HeaderReply = ({commentCount, location, post, theme}: HeaderReplyProps) => {
    const style = getStyleSheet(theme);
    const serverUrl = useServerUrl();

    const onPress = useCallback(preventDoubleTap(() => {
        const rootId = post.rootId || post.id;
        fetchAndSwitchToThread(serverUrl, rootId);
    }), [serverUrl]);

    return (
        <View
            testID='post_header.reply'
            style={style.replyWrapper}
        >
            <TouchableOpacity
                onPress={onPress}
                style={style.replyIconContainer}
            >
                <CompassIcon
                    name='reply-outline'
                    size={18}
                    color={theme.linkColor}
                />
                {location !== SEARCH && commentCount > 0 &&
                <Text
                    style={style.replyText}
                    testID='post_header.reply.count'
                >
                    {commentCount}
                </Text>
                }
            </TouchableOpacity>
        </View>
    );
};

export default HeaderReply;
