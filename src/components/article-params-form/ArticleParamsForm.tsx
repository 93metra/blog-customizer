import { useState, useRef, useEffect } from 'react';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from "../select/Select";
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions } from 'src/constants/articleProps';
import { OptionType } from 'src/constants/articleProps';
import { clsx } from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {

	// font-family selection
	const [selectedFont, setSelectedFont] = useState<typeof fontFamilyOptions[0]>(fontFamilyOptions[0]);
  const handleFontChange = (option: OptionType) => {
    setSelectedFont(option);
    console.log('Selected font:', option.value);
		console.log(option)
  };

	// font-color selection
	const [selectedFontColor, setSelectedFontColor] = useState<typeof fontColors[0]>(fontColors[0]);
  const handleFontColorChange = (option: typeof fontColors[0]) => {
    setSelectedFontColor(option);
		console.log(option);
  };

	// background-color selection
	const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<typeof backgroundColors[0]>(backgroundColors[0]);
	const handleBackgroundColorChange = (option: typeof backgroundColors[0]) => {
		setSelectedBackgroundColor(option);
		console.log(option);
	};

	// content-width selection
	const [selectedContentWidth, setSelectedContentWidth] = useState<typeof contentWidthArr[0]>(contentWidthArr[0]);
	const handleContentWidthChange = (option: typeof contentWidthArr[0]) => {
		setSelectedContentWidth(option);
		console.log(option);
	};

	// font-size selection
	const [selectedFontSize, setSelectedFontSize] = useState<typeof fontSizeOptions[0]>(fontSizeOptions[0]);
	const handleFontSizeChange = (option: typeof fontSizeOptions[0]) => {
		setSelectedFontSize(option);
		console.log(option);
	};

	// modal open/close logic
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
    }

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
							selected={selectedFont}
							onChange={handleFontChange}
							placeholder={selectedFont.title} 
							title="Шрифт" 
						/>
					</div>
					<div className={styles.wrapperWithMarginBottom}>
						<RadioGroup
							name="font-size"
							options={fontSizeOptions}
							selected={selectedFontSize}
							onChange={handleFontSizeChange}
							title="Размер шрифта" 
						/>
					</div>
					<div className={styles.wrapperWithMarginBottom}>
						<Select
							options={fontColors}
							selected={selectedFontColor}
							onChange={handleFontColorChange}
							placeholder={selectedFontColor.title} 
							title="Цвет шрифта"
						/>
					</div>
					<div className={styles.wrapperWithMarginBottom}>
						<Separator/>
					</div>
					<div className={styles.wrapperWithMarginBottom}>
						<Select
							options={backgroundColors}
							selected={selectedBackgroundColor}
							onChange={handleBackgroundColorChange}
							placeholder={selectedBackgroundColor.title}
							title="Цвет фона" 
						/>
					</div>
					<div className={styles.wrapperWithMarginBottom}>
						<Select
							options={contentWidthArr}
							selected={selectedContentWidth}
							onChange={handleContentWidthChange}
							placeholder={selectedContentWidth.title} 
							title="Ширина контента" 
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' />
						<Button title='Применить' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
