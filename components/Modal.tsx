import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type = 'success' }) => {
  if (!isOpen) return null;

  const typeStyles = {
    success: {
      icon: <CheckCircle2 className="w-12 h-12 text-green-500" />,
      bg: 'bg-green-50',
      button: 'bg-green-600 hover:bg-green-700',
    },
    error: {
      icon: <XCircle className="w-12 h-12 text-red-500" />,
      bg: 'bg-red-50',
      button: 'bg-red-600 hover:bg-red-700',
    },
    warning: {
      icon: <AlertCircle className="w-12 h-12 text-orange-500" />,
      bg: 'bg-orange-50',
      button: 'bg-orange-600 hover:bg-orange-700',
    },
  };

  const style = typeStyles[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl transform animate-in zoom-in-95 duration-300">
        <div className={`p-8 flex flex-col items-center text-center ${style.bg}`}>
          <div className="mb-4">{style.icon}</div>
          <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 font-medium leading-relaxed">{message}</p>
        </div>
        <div className="p-6 bg-white flex justify-center">
          <button
            onClick={onClose}
            className={`w-full py-4 rounded-2xl text-white font-bold transition-all active:scale-95 shadow-lg ${style.button}`}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
