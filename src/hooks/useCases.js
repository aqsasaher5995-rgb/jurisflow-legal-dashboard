import { useState } from 'react';
import { dummyCases } from '../data/dummyData';

export const useCases = () => {
  const [cases, setCases] = useState(dummyCases);

  const addCase = (newCase) => {
    const caseWithId = {
      ...newCase,
      id: Math.random().toString(36).substr(2, 9),
      documents: 0,
      hearings: 0,
      clientId: `c${Date.now()}`,
    };
    setCases([caseWithId, ...cases]);
    return caseWithId;
  };

  const updateCase = (updatedCase) => {
    setCases(
      cases.map((caseItem) =>
        caseItem.id === updatedCase.id ? updatedCase : caseItem
      )
    );
  };

  const updateCaseStatus = (id, status) => {
    setCases(
      cases.map((caseItem) =>
        caseItem.id === id ? { ...caseItem, status } : caseItem
      )
    );
  };

  const deleteCase = (id) => {
    if (window.confirm('Are you sure you want to delete this case?')) {
      setCases(cases.filter((caseItem) => caseItem.id !== id));
    }
  };

  const getFilteredCases = (tab, searchQuery) => {
    let filtered = cases;

    if (tab !== 'all') {
      filtered = filtered.filter((caseItem) => caseItem.status === tab);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (caseItem) =>
          caseItem.title.toLowerCase().includes(query) ||
          caseItem.party.toLowerCase().includes(query) ||
          caseItem.description.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const getStats = () => {
    return {
      total: cases.length,
      active: cases.filter((c) => c.status === 'active').length,
      pending: cases.filter((c) => c.status === 'pending').length,
      closed: cases.filter((c) => c.status === 'closed').length,
    };
  };

  return {
    cases,
    addCase,
    updateCase,
    updateCaseStatus,
    deleteCase,
    getFilteredCases,
    getStats,
  };
};