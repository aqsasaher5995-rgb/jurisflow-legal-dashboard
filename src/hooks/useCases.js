// src/hooks/useCases.js
import { useState, useEffect } from 'react';
import { dummyCases } from '../data/dummyData';
import toast from 'react-hot-toast';

export const useCases = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cases from dummy data (no backend needed!)
  const fetchCases = async () => {
    console.log('📦 Loading dummy cases...');
    setLoading(true);
    setError(null);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('✅ Dummy cases loaded:', dummyCases.length);
      setCases(dummyCases);
      return { success: true, cases: dummyCases };
    } catch (err) {
      setError(err.message || 'Failed to fetch cases');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // Add case (local only)
  const addCase = async (caseData) => {
    console.log('➕ Adding case locally...');
    try {
      const newCase = {
        id: `case_${Date.now()}`,
        ...caseData,
        status: caseData.status || 'active',
        documentsCount: 0,
        hearings: 0,
        createdAt: new Date().toISOString(),
      };
      
      setCases(prevCases => [newCase, ...prevCases]);
      toast.success('Case added successfully! 🎉');
      return { success: true, data: newCase };
    } catch (err) {
      console.error('❌ Error adding case:', err);
      toast.error('Failed to add case');
      return { success: false, error: err.message };
    }
  };

  // Update case (local only)
  const updateCase = async (id, caseData) => {
    console.log('🔄 Updating case locally:', id);
    try {
      setCases(prevCases => 
        prevCases.map(c => {
          if (c.id === id || c._id === id) {
            return { ...c, ...caseData };
          }
          return c;
        })
      );
      toast.success('Case updated successfully! ✅');
      return { success: true, data: caseData };
    } catch (err) {
      console.error('❌ Error updating case:', err);
      toast.error('Failed to update case');
      return { success: false, error: err.message };
    }
  };

  // Delete case (local only)
  const deleteCase = async (id) => {
    console.log('🗑️ Deleting case locally:', id);
    if (!window.confirm('Are you sure you want to delete this case?')) {
      return { success: false };
    }
    try {
      setCases(prevCases => prevCases.filter(c => c.id !== id && c._id !== id));
      toast.success('Case deleted successfully! 🗑️');
      return { success: true };
    } catch (err) {
      console.error('❌ Error deleting case:', err);
      toast.error('Failed to delete case');
      return { success: false, error: err.message };
    }
  };

  // Update case status (local only)
  const updateCaseStatus = async (id, status) => {
    console.log('📝 Updating status locally:', id, status);
    try {
      setCases(prevCases => 
        prevCases.map(c => {
          if (c.id === id || c._id === id) {
            return { ...c, status };
          }
          return c;
        })
      );
      toast.success(`Case status updated to ${status}`);
      return { success: true };
    } catch (err) {
      console.error('❌ Error updating status:', err);
      toast.error('Failed to update status');
      return { success: false, error: err.message };
    }
  };

  // Get filtered cases
  const getFilteredCases = (tab, searchQuery) => {
    console.log('🔍 Filtering cases - Tab:', tab, 'Search:', searchQuery);
    let filtered = cases;

    // Special tabs
    if (tab === 'solved') {
      const solvedCaseIds = ['3', '5'];
      return cases.filter(c => 
        c.status === 'closed' && solvedCaseIds.includes(c.id)
      );
    }

    if (tab === 'reference') {
      return [];
    }

    // Filter by status
    if (tab !== 'all' && tab !== 'solved' && tab !== 'reference') {
      filtered = filtered.filter(c => c.status === tab);
    }

    // Filter by search query
    if (searchQuery && searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(c =>
        c.caseTitle?.toLowerCase().includes(query) ||
        c.title?.toLowerCase().includes(query) ||
        c.caseNumber?.toLowerCase().includes(query) ||
        c.party?.toLowerCase().includes(query) ||
        c.description?.toLowerCase().includes(query)
      );
    }

    console.log('📊 Filtered cases count:', filtered.length);
    return filtered;
  };

  // Get stats
  const getStats = () => {
    const stats = {
      total: cases.length,
      active: cases.filter(c => c.status === 'active').length,
      pending: cases.filter(c => c.status === 'pending').length,
      closed: cases.filter(c => c.status === 'closed').length,
    };
    console.log('📊 Stats:', stats);
    return stats;
  };

  // Initial fetch - runs once when component mounts
  useEffect(() => {
    console.log('🚀 useCases mounted - loading dummy data...');
    fetchCases();
  }, []);

  return {
    cases,
    loading,
    error,
    fetchCases,
    addCase,
    updateCase,
    deleteCase,
    updateCaseStatus,
    getFilteredCases,
    getStats,
  };
};