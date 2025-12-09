import React, { useEffect, useRef, useId } from 'react';
import styles from './Checkbox.module.css';

export interface CheckboxProps {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  'aria-label'?: string;
  name?: string;
  value?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked = false,
  indeterminate = false,
  disabled = false,
  error = false,
  className = '',
  'aria-label': ariaLabel,
  name,
  value,
  required = false,
  onChange,
  onFocus,
  onBlur,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uniqueId = useId();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [
    // Module Classes
    styles.root,
    error && styles.rootError,
    disabled && styles.rootDisabled,
    // Legacy Classes
    'exa-checkbox-wrapper',
    error && 'exa-checkbox-wrapper--error',
    disabled && 'exa-checkbox-wrapper--disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const checkboxClasses = [
    // Module Classes
    styles.container,
    checked && styles.checked,
    indeterminate && styles.indeterminate,
    error && styles.error,
    disabled && styles.disabled,
    // Legacy Classes
    'exa-checkbox',
    checked && 'exa-checkbox--checked',
    indeterminate && 'exa-checkbox--indeterminate',
    error && 'exa-checkbox--error',
    disabled && 'exa-checkbox--disabled',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <label htmlFor={uniqueId} className={`exa-checkbox-label ${styles.label}`}>
        <div className={checkboxClasses}>
          <input
            ref={inputRef}
            id={uniqueId}
            type="checkbox"
            className={`exa-checkbox__input ${styles.input}`}
            checked={checked}
            disabled={disabled}
            readOnly={!onChange}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            aria-label={ariaLabel || label}
            name={name}
            value={value}
            required={required}
          />
          <div className={`exa-checkbox__box ${styles.box}`}>
            {checked && !indeterminate && (
              <svg
                className={`exa-checkbox__icon ${styles.icon}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {indeterminate && (
              <svg
                className={`exa-checkbox__icon ${styles.icon}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 6H10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
        </div>
        {label && <span className={`exa-checkbox-label__text ${styles.labelText}`}>{label}</span>}
      </label>
    </div>
  );
};

Checkbox.displayName = 'Checkbox';
