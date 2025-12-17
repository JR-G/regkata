import { useState } from 'react';
import { Welcome } from './components/Welcome.js';
import { Menu } from './components/Menu.js';
import { LessonView } from './components/LessonView.js';
import { markLessonComplete } from './store.js';
import type { AppState, Lesson } from './types.js';

export const App = () => {
  const [state, setState] = useState<AppState>({ type: 'welcome' });

  const handleWelcomeContinue = () => {
    setState({ type: 'menu' });
  };

  const handleSelectLesson = (lesson: Lesson) => {
    setState({ type: 'lesson', lesson });
  };

  const handleLessonComplete = () => {
    if (state.type === 'lesson') {
      markLessonComplete(state.lesson.id);
      setState({ type: 'completed', lesson: state.lesson });
      setTimeout(() => setState({ type: 'menu' }), 800);
    }
  };

  const handleExitToMenu = () => {
    setState({ type: 'menu' });
  };

  const handleExit = () => {
    process.exit(0);
  };

  switch (state.type) {
    case 'welcome':
      return <Welcome onContinue={handleWelcomeContinue} />;
    case 'menu':
      return <Menu onSelectLesson={handleSelectLesson} onExit={handleExit} />;
    case 'lesson':
      return (
        <LessonView
          lesson={state.lesson}
          onComplete={handleLessonComplete}
          onExit={handleExitToMenu}
        />
      );
    case 'completed':
      return null;
  }
};
