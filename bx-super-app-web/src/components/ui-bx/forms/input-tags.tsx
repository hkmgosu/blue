import { ChangeEvent, Dispatch, SetStateAction, KeyboardEvent } from 'react';
// import cs from 'classnames';

import XIcon from './icons/x-icon';
import styles from './input-tags.module.scss';

type Props = {
  valuesTag?: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  validator?: (val: string) => boolean;
  setInputTags: Dispatch<SetStateAction<string[]>>;
  placeholder?: string;
  error?: boolean;
  fullWidth?: boolean;
  inputSize?: 'sm' | 'md';
};

export default function InputTags({
  valuesTag = [],
  setInputTags,
  value,
  setValue,
  placeholder,
  validator,
}: Props): JSX.Element {
  const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
    setValue(evt.target.value);
  };

  const addTag = (val: string): void => {
    setInputTags((prev) => {
      if (prev.includes(val)) return prev;
      return [...prev, val];
    });
    setValue('');
  };

  const removeTag = (i: number): void => {
    let tags = [...valuesTag];
    tags.splice(i, 1);
    setInputTags(tags);
  };

  const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>): void => {
    if (evt.key === 'Enter' || evt.key === 'Tab') {
      evt.preventDefault();

      if (value === '') return;
      const valid = validator !== undefined ? validator(value) : true;
      if (!valid) return;
      addTag(value);
    } else if (evt.key === 'Backspace') {
      if (value !== '') return;
      removeTag(valuesTag.length - 1);
    }
  };

  return (
    <fieldset className={styles.InputTag}>
      {valuesTag &&
        valuesTag.map((tag, index) => (
          <div key={index} className={styles.Tag}>
            <div className={styles.TagBox}>
              <div className={styles.TagText}>{tag}</div>
              <button
                className={styles.TagButton}
                onClick={() => removeTag(index)}
              >
                <div className={styles.TagButtonBox}>
                  <XIcon size='4' />
                </div>
              </button>
            </div>
          </div>
        ))}
      <div className={styles.InputBox}>
        <input
          type='text'
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={styles.Input}
          onKeyDown={handleKeyDown}
        />
      </div>
    </fieldset>
  );
}
