import React, { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from "../select/Select";
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions } from 'src/constants/articleProps';
import { defaultArticleState } from 'src/constants/articleProps';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsFormProps {
  globalState: typeof defaultArticleState;
  updateGlobalState: (newState: typeof defaultArticleState) => void;
}

export const ArticleParamsForm: React.FC<ArticleParamsFormProps> = ({ globalState, updateGlobalState }) => {

  // Условное состояние для всех параметров
  const [formState, setFormState] = useState(globalState);

  // Функция для обновления состояния
  const handleChange = (key: keyof typeof formState, value: typeof formState[keyof typeof formState]) => {
    setFormState(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };

  // Функция для сброса состояния
  const resetForm = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormState(defaultArticleState);
		updateGlobalState(defaultArticleState);
  };

	// Функция для применения состояния
	const handleApply = (e: React.MouseEvent) => {
    e.preventDefault();
    updateGlobalState(formState);
  };

  // Функционал открытия и закрытия модального окна
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const handleButtonOpen = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false); 
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside); 
    } else {
      document.removeEventListener('mousedown', handleClickOutside); 
    };

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <ArrowButton isOpen={isOpen} onClick={handleButtonOpen}/>
      <aside ref={modalRef} className={clsx(styles.container, { [styles.container_open]: isOpen })}>
        <form className={styles.form}>
          <div className={styles.wrapperWithMarginBottom}>
            <Text as="h1" uppercase={true} weight={800} size={31}>Задайте параметры</Text>
          </div>
          <div className={styles.wrapperWithMarginBottom}>
            <Select
              options={fontFamilyOptions}
              selected={formState.fontFamilyOption}
              onChange={(option) => handleChange('fontFamilyOption', option)}
              placeholder={formState.fontFamilyOption.title} 
              title="Шрифт" 
            />
          </div>
          <div className={styles.wrapperWithMarginBottom}>
            <RadioGroup
              name="font-size"
              options={fontSizeOptions}
              selected={formState.fontSizeOption}
              onChange={(option) => handleChange('fontSizeOption', option)}
              title="Размер шрифта" 
            />
          </div>
          <div className={styles.wrapperWithMarginBottom}>
            <Select
              options={fontColors}
              selected={formState.fontColor}
              onChange={(option) => handleChange('fontColor', option)}
              placeholder={formState.fontColor.title} 
              title="Цвет шрифта"
            />
          </div>
          <div className={styles.wrapperWithMarginBottom}>
            <Separator/>
          </div>
          <div className={styles.wrapperWithMarginBottom}>
            <Select
              options={backgroundColors}
              selected={formState.backgroundColor}
              onChange={(option) => handleChange('backgroundColor', option)}
              placeholder={formState.backgroundColor.title}
              title="Цвет фона" 
            />
          </div>
          <div className={styles.wrapperWithMarginBottom}>
            <Select
              options={contentWidthArr}
              selected={formState.contentWidth}
              onChange={(option) => handleChange('contentWidth', option)}
              placeholder={formState.contentWidth.title} 
              title="Ширина контента" 
            />
          </div>
          <div className={styles.bottomContainer}>
            <Button 
              onClick={resetForm} 
              title='Сбросить' 
              type='clear' 
            />
            <Button 
              onClick={handleApply}
              title='Применить' 
              type='apply' 
            />
          </div>
        </form>
      </aside>
    </>
  );
};