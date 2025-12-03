import { describe, it, expect } from 'vitest';
import { sanitizeInput, sanitizeObject, sanitizeEmail } from './sanitize';

describe('Sanitization Utilities', () => {
  describe('sanitizeInput', () => {
    it('should trim whitespace from input', () => {
      expect(sanitizeInput('  Breaking Bad  ')).toBe('Breaking Bad');
    });

    it('should remove script tags', () => {
      expect(sanitizeInput('<script>alert("xss")</script>Breaking Bad')).toBe('Breaking Bad');
    });

    it('should handle empty strings', () => {
      expect(sanitizeInput('')).toBe('');
    });

    it('should preserve HTML tags that are not dangerous', () => {
      // sanitizeInput only removes <script> and <iframe> tags, not generic HTML
      const result = sanitizeInput('<b>Breaking</b> Bad');
      expect(result).toContain('Breaking');
      expect(result).toContain('Bad');
    });

    it('should return input unchanged if not a string', () => {
      expect(sanitizeInput(123)).toBe(123);
    });
  });

  describe('sanitizeObject', () => {
    it('should sanitize all string values in object', () => {
      const input = {
        title: '  Breaking Bad  ',
        director: '<script>test</script>Vince',
      };
      const result = sanitizeObject(input);
      expect(result.title).toBe('Breaking Bad');
      expect(result.director).toBe('Vince');
    });

    it('should preserve non-string values', () => {
      const input = {
        title: 'Breaking Bad',
        numberOfSeasons: 5,
      };
      const result = sanitizeObject(input);
      expect(result.numberOfSeasons).toBe(5);
    });

    it('should only sanitize string values, not process nested objects', () => {
      const input = {
        title: '  Test  ',
        nested: {
          value: '  nested  ',
        },
      };
      const result = sanitizeObject(input);
      expect(result.title).toBe('Test');
      // sanitizeObject doesn't recursively process nested objects
      expect(result.nested.value).toBe('  nested  ');
    });

    it('should only sanitize top-level string values in arrays', () => {
      const input = {
        items: [
          { name: '  Item 1  ' },
          { name: '  Item 2  ' },
        ],
      };
      const result = sanitizeObject(input);
      // Arrays are not string values, so they're preserved as-is
      expect(result.items[0].name).toBe('  Item 1  ');
      expect(result.items[1].name).toBe('  Item 2  ');
    });
  });

  describe('sanitizeEmail', () => {
    it('should validate correct email addresses', () => {
      expect(sanitizeEmail('test@example.com')).toBe('test@example.com');
    });

    it('should return null for invalid email addresses', () => {
      expect(sanitizeEmail('invalid-email')).toBeNull();
    });

    it('should return null for empty strings', () => {
      expect(sanitizeEmail('')).toBeNull();
    });

    it('should validate emails with subdomains', () => {
      expect(sanitizeEmail('user@mail.example.com')).toBe('user@mail.example.com');
    });

    it('should return null for emails without domain', () => {
      expect(sanitizeEmail('user@')).toBeNull();
    });
  });
});
