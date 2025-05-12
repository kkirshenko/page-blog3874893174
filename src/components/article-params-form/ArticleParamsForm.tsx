import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { Text } from 'src/ui/text';

import styles from './ArticleParamsForm.module.scss';
import { useRef, useState } from 'react';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import clsx from 'clsx';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	setArticleState: React.Dispatch<React.SetStateAction<ArticleStateType>>;
}

export const ArticleParamsForm = ({
	articleState,
	setArticleState,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement>(null);
	const [wantedArticleState, setWantedArticleState] = useState(articleState);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}
				ref={rootRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setArticleState(wantedArticleState);
					}}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>

					{/* Секция выбора шрифта */}
					<Select
						selected={wantedArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(selected) =>
							setWantedArticleState({
								...wantedArticleState,
								fontFamilyOption: selected,
							})
						}
					/>

					{/* Секция размера шрифта */}
					<RadioGroup
						selected={wantedArticleState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(selected) =>
							setWantedArticleState({
								...wantedArticleState,
								fontSizeOption: selected,
							})
						}
						name='font-size'
					/>

					{/* Секция выбора цвета шрифта */}
					<Select
						selected={wantedArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(selected) =>
							setWantedArticleState({
								...wantedArticleState,
								fontColor: selected,
							})
						}
					/>
					<Separator />
					{/* Секция выбора фона */}
					<Select
						selected={wantedArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(selected) =>
							setWantedArticleState({
								...wantedArticleState,
								backgroundColor: selected,
							})
						}
					/>

					{/* Секция ширины контента */}
					<Select
						selected={wantedArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(selected) =>
							setWantedArticleState({
								...wantedArticleState,
								contentWidth: selected,
							})
						}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={() => {
								setWantedArticleState(defaultArticleState);
								setArticleState(defaultArticleState);
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
