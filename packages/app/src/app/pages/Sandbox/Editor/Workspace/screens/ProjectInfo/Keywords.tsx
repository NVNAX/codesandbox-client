import React, { FunctionComponent } from 'react';
import { useOvermind } from 'app/overmind';
import { json } from 'overmind';
import { Tags, TagInput } from '@codesandbox/components';

type Props = {
  editable?: boolean;
};

export const Keywords: FunctionComponent<Props> = ({ editable }) => {
  const {
    actions: {
      workspace: { tagChanged, tagsChanged },
    },
    state: {
      editor: {
        currentSandbox: { tags },
      },
      workspace: {
        tags: { tagName },
      },
    },
  } = useOvermind();

  if (tags.length === 0 && !editable) {
    return null;
  }

  const changeTags = (newTags: string[], removedTags: string[]) => {
    tagsChanged({ newTags, removedTags });
  };

  return (
    <div>
      {editable ? (
        <>
          <TagInput
            value={json(tags)}
            onChange={changeTags}
            inputValue={tagName}
            onChangeInput={tagChanged}
          />
        </>
      ) : (
        <Tags tags={tags} />
      )}
    </div>
  );
};
