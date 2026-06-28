import { useState } from 'react';
import { Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');

    const error = await signIn(email);
    if (error) {
      setErrorMessage(error.message || 'Unable to send sign-in link');
      return;
    }

    navigate('/app/dashboard');
  };

  return (
    <div className="mx-auto max-w-lg space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <PageHeader
        title="Sign in"
        description="Sign in with your email to keep your GPA history private and accessible only to you."
      />

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Button type="submit" className="w-full">Send Sign-in Link</Button>
          {errorMessage && <p className="text-sm text-rose-500">{errorMessage}</p>}
        </form>
      </Card>
    </div>
  );
}
