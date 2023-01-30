import { UrlRegExp } from './utils/regexp';

import React, { useEffect, useState } from 'react';

import { Button } from '@factly/scooter-ui';
import { RiCloseLine } from 'react-icons/ri';
import { isNilOrEmpty } from './utils/common';

export const LinkOption = ({
  editor,
  handleClose,
  handleAnimateInvalidLink,
}) => {
  const [link, setLink] = useState('');
  const [target, setTarget] = useState(true);

  useEffect(() => {
    setLink(editor.getAttributes('link').href || '');
    setTarget(
      editor.getAttributes('link').target
        ? editor.getAttributes('link').target === '__blank'
        : true
    );
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    } else if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    if (UrlRegExp.test(link)) {
      editor
        .chain()
        .focus()
        .setLink({ href: link, target: target ? '__blank' : '__self' })
        .run();
      handleClose();
    } else if (isNilOrEmpty(link)) {
      editor.chain().focus().unsetLink().run();
      handleClose();
    } else {
      setLink('');
      handleAnimateInvalidLink();
    }
  };

  const handleReset = () => {
    if (link) {
      setLink('');
      editor.chain().focus().unsetLink().run();
    } else {
      handleClose();
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="scooter-editor-bubble-menu__link">
      <input
        autoFocus
        name="url"
        value={link}
        placeholder="Paste or type a link..."
        onChange={({ target: { value } }) => setLink(value)}
        className="scooter-editor-bubble-menu-link__input"
        data-cy="scooter-editor-link-input"
      />
      <Button
        variant="icon"
        icon={RiCloseLine}
        onClick={handleReset}
        data-cy="scooter-editor-link-cancel-button"
      />
      <label htmlFor="target">
        <input
          type="checkbox"
          id="target"
          checked={target}
          onChange={() => setTarget(!target)}
        />{' '}
        Open in new tab
      </label>
    </div>
  );
};

export default LinkOption;
