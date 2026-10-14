'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose?: () => void;
}

export default function Toast({ message, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-[var(--bg-elevated)] text-[var(--text)] border border-[var(--accent)]/40 shadow-[var(--shadow-md)] backdrop-blur-md font-mono text-xs"
          role="status"
          aria-live="polite"
        >
          <CheckCircle2 className="w-4 h-4 text-[var(--success)] shrink-0" />
          <span>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
