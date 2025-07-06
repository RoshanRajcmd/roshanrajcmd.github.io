import { render, screen } from '@testing-library/react';
import App from './App';
import Navbar from './components/Navbar';

// Test for main heading
test('Renders main heading with Roshan Raj', () => {
  render(<App />);
  expect(screen.getByText(/Roshan Raj./i)).toBeInTheDocument();//ignore case sensitivity and patterns after 'Roshan Raj'
});

// Test for thank you message
test('Displays thank you message in the footer', () => {
  render(<App />);
  expect(
    screen.getByText(/You could have been anywhere on the internet, yet you're here. Thanks for visiting/i)
  ).toBeInTheDocument();
});

// Test for social links
test('Has social links for GitHub, LinkedIn, and Email', () => {
  render(<App />);
  expect(screen.getByLabelText(/GitHub/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/LinkedIn/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
});

// Test for Resume download link in Navbar
// When unit testing Navbar alone, we need to pass the required props
test('Navbar has Resume download link', () => {
  render(<Navbar
    darkMode={false}
    scrolled={false}
    toggleTheme={() => { }}
    sections={[]} // empty is fine unless you're testing section buttons
    scrollToSection={() => { }}
    soundOn={false}
    setSoundOn={() => { }}
  />);
  const resumeLink = screen.getByText(/Resume/i);
  expect(resumeLink).toBeInTheDocument();
  // Check that it's a link with the 'download' attribute
  expect(resumeLink.closest('a')).toHaveAttribute('href', expect.stringContaining('resume.pdf'));
  expect(resumeLink.closest('a')).toHaveAttribute('download');
});
