import React from 'react';
import { useContext } from 'react';
import { ThemeSelectorContext } from '../../contexts/theme/theme';
import './theme-button.scoped.scss';
import Button from 'react-bootstrap/Button';

const ThemeButton = () => {

    const { toggleTheme, themeName } = useContext(ThemeSelectorContext);

    return (
        <div className="container">
            <h1>Title</h1>
            <section>
                <h3>Subtitle</h3>
                <Button
                    variant="primary"
                    onClick={toggleTheme}
                >
                    {themeName}
                </Button>
            </section>
        </div>
    );
}

export default ThemeButton;