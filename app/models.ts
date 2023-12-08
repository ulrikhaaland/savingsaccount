"use client";
import jsonData from "../bankdata.json";

export interface BankEntry {
  title?: string;
  id?: string;
  updated?: string;
  navn?: string;
  leverandor?: string;
  leverandor_tekst?: string;
  produktpakke?: string;
  produktpakke_tekst?: string;
  frie_uttak?: number;
  grensebelop1?: number;
  grensebelop2?: number; // Optional if not all entries have this field
  gruppe?: string;
  highestEntryFee?: number;
  kap_periode?: number;
  lowestEntryFee?: number;
  maks_alder?: number;
  manedlig_sparing?: boolean;
  markedsomraade?: string;
  markedsomraadeBoliglan?: string;
  markedsomraadeBoliglanTekst?: string;
  markedsomraadeTekst?: string;
  maks_belop?: number;
  min_alder?: number;
  min_belop?: number;
  oppfolging?: boolean;
  pensjonist?: boolean;
  publiserFra?: string;
  rentesats1?: number;
  rentesats2?: number; // Optional if not all entries have this field
  spesielle_betingelser?: string;
  student?: boolean;
  trapp_type?: string;
  trenger_ikke_pakke?: boolean;
  description?: string;
  rank?: number;
}

export const getEntryById = (entryId: string): BankEntry | undefined => {
  const entries = jsonData.entries;
  return entries.find((entry) => entry.id === entryId);
};
