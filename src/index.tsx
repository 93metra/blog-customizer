import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
  const [globalState, setGlobalState] = useState(defaultArticleState);

  return (
    <div
      className={clsx(styles.main)}
      style={
        {
          '--font-family': globalState.fontFamilyOption.value,
          '--font-size': globalState.fontSizeOption.value,
          '--font-color': globalState.fontColor.value,
          '--container-width': globalState.contentWidth.value,
          '--bg-color': globalState.backgroundColor.value,
        } as CSSProperties
      }>
      <ArticleParamsForm globalState={globalState} updateGlobalState={setGlobalState} />
      <Article />
    </div>
  );
};

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
