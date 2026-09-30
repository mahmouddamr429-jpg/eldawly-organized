'use client';

import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function Modal({ open, onClose, children, title }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 z-[3000] flex items-center justify-center p-4" onClick={onClose}>
      <div className="modal-pop-in bg-white rounded-[20px] max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
        {title && (
          <div className="flex items-center justify-between p-5 border-b border-[#e8ddd2]">
            <h2 className="text-xl font-extrabold text-[#2d2017]">{title}</h2>
            <button onClick={onClose} className="text-[#aaa]"><X size={20} /></button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
