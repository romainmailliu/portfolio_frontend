"use client";

import { useEffect } from "react";
import { markInternalVisitor } from "../../lib/internal-visitor";

/**
 * Monté sur le dashboard : à partir du prochain chargement de page, ce
 * navigateur ne compte plus dans les statistiques du site.
 */
export function MarkInternalVisitor() {
  useEffect(() => {
    markInternalVisitor();
  }, []);

  return null;
}
