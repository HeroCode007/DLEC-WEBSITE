import React, { useState } from 'react';
import { Award, Building2, Search, CheckCircle2, ShieldCheck, Factory, Image, Eye, X } from 'lucide-react';

export interface ClientPartner {
  name: string;
  category: 'Food & Beverage' | 'Pharmaceuticals & Health' | 'Heavy Industry & Steel' | 'Automotive & Energy' | 'Logistics & Infrastructure' | 'Textiles & Packaging';
  subtext?: string;
  tag: string;
  logoUrl?: string;
}

export const CLIENT_PARTNERS: ClientPartner[] = [
  { name: 'Mughal Steel', category: 'Heavy Industry & Steel', tag: 'Steel Metallurgy', subtext: 'Quality Rebars & Steel', logoUrl: '/clients/mughal-steel.jpg' },
  { name: 'NLC (National Logistics Cell)', category: 'Logistics & Infrastructure', tag: 'Logistics & Supply Chain', subtext: 'National Supply Infrastructure', logoUrl: '/clients/nlc.jpg' },
  { name: 'K-Electric (KE)', category: 'Automotive & Energy', tag: 'Power Generation & Grid', subtext: 'Power Utility Leader', logoUrl: '/clients/ke.jpg' },
  { name: 'Metaline Industries', category: 'Heavy Industry & Steel', tag: 'Metal Stamping & Dies', subtext: 'Precision Components', logoUrl: '/clients/metaline.jpg' },
  { name: 'DG Cement', category: 'Heavy Industry & Steel', tag: 'Cement & Construction', subtext: 'Nishat Group Entity', logoUrl: '/clients/dg-cement.jpg' },
  { name: 'PepsiCo International', category: 'Food & Beverage', tag: 'Beverage & Snacks', subtext: 'Global Food Giant', logoUrl: '/clients/pepsico.jpg' },
  { name: 'Coca-Cola', category: 'Food & Beverage', tag: 'Beverage & Bottling', subtext: 'Global Beverage Leader', logoUrl: '/clients/coca-cola.jpg' },
  { name: 'GlaxoSmithKline (GSK)', category: 'Pharmaceuticals & Health', tag: 'Pharma & Life Sciences', subtext: 'Global Healthcare', logoUrl: '/clients/gsk.jpg' },
  { name: 'Atlas Honda', category: 'Automotive & Energy', tag: 'Automotive Manufacturing', subtext: 'Motorcycle & Power Products', logoUrl: '/clients/atlas-honda.jpg' },
  { name: 'Descon Engineering', category: 'Heavy Industry & Steel', tag: 'Heavy Engineering', subtext: 'EPCC Industrial Partner', logoUrl: '/clients/descon.jpg' },
  { name: 'FWO (Frontier Works Org)', category: 'Logistics & Infrastructure', tag: 'Defense & Infrastructure', subtext: 'Mega Civil Projects', logoUrl: '/clients/fwo.jpg' },
  { name: 'Millat Tractors (MTL)', category: 'Automotive & Energy', tag: 'Agricultural Machinery', subtext: 'Massey Ferguson Manufacturer', logoUrl: '/clients/millat-tractors.jpg' },
  { name: 'Al-Ghazi Tractors', category: 'Automotive & Energy', tag: 'Farm Machinery', subtext: 'CNH Industrial Partner', logoUrl: '/clients/alghazi.jpg' },
  { name: 'PEL (Pak Elektron Limited)', category: 'Automotive & Energy', tag: 'Electrical & Appliances', subtext: 'Transformers & Electronics', logoUrl: '/clients/pel.jpg' },
  { name: 'NESPAK', category: 'Logistics & Infrastructure', tag: 'Engineering Consultancy', subtext: 'National Engineering Services', logoUrl: '/clients/nespak.jpg' },
  { name: 'Haleeb Foods', category: 'Food & Beverage', tag: 'Dairy & Beverages', subtext: 'Pioneer Dairy Producer', logoUrl: '/clients/haleeb-foods.jpg' },
  { name: 'Gourmet Foods', category: 'Food & Beverage', tag: 'FMCG & Bakery', subtext: 'Food Processing Leader', logoUrl: '/clients/gourmet-foods.jpg' },
  { name: 'Simply Sufi', category: 'Food & Beverage', tag: 'Poultry & Food Products', subtext: 'Premium Meat Processing', logoUrl: '/clients/simply-sufi.jpg' },
  { name: 'Shezan International', category: 'Food & Beverage', tag: 'Juices & Food Processing', subtext: 'FMCG Pioneer', logoUrl: '/clients/shezan.jpg' },
  { name: 'CCL Pharmaceuticals', category: 'Pharmaceuticals & Health', tag: 'Pharma Manufacturing', subtext: 'Healthcare Solutions', logoUrl: '/clients/ccl-pharma.jpg' },
  { name: 'Saffron Pharmaceuticals', category: 'Pharmaceuticals & Health', tag: 'Medical Formulation', subtext: 'Quality Therapeutics', logoUrl: '/clients/saffron.jpg' },
  { name: 'ICI Paints / AkzoNobel', category: 'Pharmaceuticals & Health', tag: 'Chemicals & Coatings', subtext: 'Performance Coatings', logoUrl: '/clients/ici-paints.jpg' },
  { name: 'Brighto Paints', category: 'Pharmaceuticals & Health', tag: 'Paints & Finishes', subtext: 'Inspired by Nature', logoUrl: '/clients/brighto.jpg' },
  { name: 'Sapphire Textiles', category: 'Textiles & Packaging', tag: 'Textile & Apparel', subtext: 'Premier Textile Group', logoUrl: '/clients/sapphire.jpg' },
  { name: 'Kohinoor Mills', category: 'Textiles & Packaging', tag: 'Spinning & Weaving', subtext: 'Export Textile Manufacturer', logoUrl: '/clients/kohinoor.jpg' },
  { name: 'US Denim', category: 'Textiles & Packaging', tag: 'Denim Manufacturing', subtext: 'Sustainable Apparel', logoUrl: '/clients/us-denim.jpg' },
  { name: 'Urbansole', category: 'Textiles & Packaging', tag: 'Footwear & Retail', subtext: 'Fashion & Footwear', logoUrl: '/clients/urbansole.jpg' },
  { name: 'Treet Corporation', category: 'Textiles & Packaging', tag: 'Personal Care & Packaging', subtext: 'Diversified Conglomerate', logoUrl: '/clients/treet-corporation.jpg' },
  { name: 'Roshan Packages', category: 'Textiles & Packaging', tag: 'Corrugated Packaging', subtext: 'Flexible Packaging', logoUrl: '/clients/roshan-packages.jpg' },
  { name: 'Tri-Pack Films Limited', category: 'Textiles & Packaging', tag: 'BOPP & CPP Films', subtext: 'Packaging Films Leader', logoUrl: '/clients/tripack.jpg' },
  { name: 'Packaging Solutions', category: 'Textiles & Packaging', tag: 'Industrial Packaging', subtext: 'Custom Container Tech', logoUrl: '/clients/packaging-solutions.jpg' },
  { name: 'IPAK (Packages Group)', category: 'Textiles & Packaging', tag: 'Flexible Packaging', subtext: 'International Packaging', logoUrl: '/clients/ipak.jpg' },
  { name: 'EMCO Industries', category: 'Automotive & Energy', tag: 'High Voltage Insulators', subtext: 'Power Grid Components', logoUrl: '/clients/emco.jpg' },
  { name: 'AFCO Steel', category: 'Heavy Industry & Steel', tag: 'Structural Steel', subtext: 'Construction Steel', logoUrl: '/clients/afco-steel.jpg' },
];

const CATEGORIES = [
  'All',
  'Food & Beverage',
  'Pharmaceuticals & Health',
  'Heavy Industry & Steel',
  'Automotive & Energy',
  'Logistics & Infrastructure',
  'Textiles & Packaging',
] as const;

export const EminentCustomersSection: React.FC<{ showGridOnly?: boolean }> = ({ showGridOnly = false }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showFullSheetModal, setShowFullSheetModal] = useState<boolean>(false);

  const filteredPartners = CLIENT_PARTNERS.filter((partner) => {
    const matchesCategory = selectedCategory === 'All' || partner.category === selectedCategory;
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          partner.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 via-slate-900 to-blue-950 text-white overflow-hidden relative">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/30 px-4 py-2 rounded-full text-blue-400 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 shadow-inner">
            <Award size={16} className="text-blue-400" />
            <span>Direct Line Engineering — Proactive Calibration Vendor</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Our <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">Eminent Customers</span> & Corporate Partners
          </h2>
          
          <p className="text-gray-300 max-w-3xl mx-auto text-base sm:text-lg leading-relaxed mb-6">
            Trusted by over <strong className="text-blue-400">35+ industry leaders</strong> across Pakistan for ISO 9001:2015 certified, high-precision traceable calibration services in food processing, healthcare, steel metallurgy, automotive, and power generation.
          </p>

          <button
            onClick={() => setShowFullSheetModal(true)}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-lg transition-all cursor-pointer"
          >
            <Eye size={16} /> View Official Customers Certificate Sheet
          </button>
        </div>

        {/* Infinite Animated Ticker / Marquee (if not grid only) */}
        {!showGridOnly && (
          <div className="mb-16 relative">
            <div className="text-xs uppercase tracking-widest text-center text-gray-400 font-semibold mb-6 flex items-center justify-center gap-2">
              <ShieldCheck size={14} className="text-green-400" />
              <span>Trusted By Pakistan&apos;s Leading Industrial Brands</span>
            </div>

            {/* Marquee Track */}
            <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll py-4">
                {CLIENT_PARTNERS.slice(0, 18).map((client, idx) => (
                  <li key={`m1-${idx}`} className="flex-shrink-0">
                    <div className="bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-400/40 rounded-xl px-5 py-3.5 transition-all duration-300 backdrop-blur-md flex items-center gap-3 group shadow-lg">
                      {client.logoUrl ? (
                        <div className="w-14 h-9 rounded-lg bg-white p-1 flex items-center justify-center shadow-inner overflow-hidden">
                          <img src={client.logoUrl} alt={client.name} className="max-h-full max-w-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <Building2 size={18} />
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold text-gray-200 group-hover:text-white block whitespace-nowrap">{client.name}</span>
                        <span className="text-[11px] text-gray-400 group-hover:text-blue-300 block">{client.tag}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-infinite-scroll py-4" aria-hidden="true">
                {CLIENT_PARTNERS.slice(0, 18).map((client, idx) => (
                  <li key={`m2-${idx}`} className="flex-shrink-0">
                    <div className="bg-white/5 hover:bg-white/15 border border-white/10 hover:border-blue-400/40 rounded-xl px-5 py-3.5 transition-all duration-300 backdrop-blur-md flex items-center gap-3 group shadow-lg">
                      {client.logoUrl ? (
                        <div className="w-14 h-9 rounded-lg bg-white p-1 flex items-center justify-center shadow-inner overflow-hidden">
                          <img src={client.logoUrl} alt={client.name} className="max-h-full max-w-full object-contain" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                          <Building2 size={18} />
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold text-gray-200 group-hover:text-white block whitespace-nowrap">{client.name}</span>
                        <span className="text-[11px] text-gray-400 group-hover:text-blue-300 block">{client.tag}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Interactive Search & Category Filter Bar */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 mb-10 shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search customer name or sector..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-800/80 border border-slate-700/80 text-white placeholder-gray-400 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Total Badge Counter */}
            <div className="text-xs font-semibold text-gray-400 flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-xl border border-slate-700/50">
              <Factory size={16} className="text-blue-400" />
              <span>Showing <strong className="text-white font-bold">{filteredPartners.length}</strong> of {CLIENT_PARTNERS.length} Corporate Partners</span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 font-semibold scale-105'
                    : 'bg-slate-800/60 text-gray-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredPartners.map((client, idx) => (
            <div
              key={idx}
              className="bg-slate-800/50 hover:bg-slate-800/90 border border-slate-700/60 hover:border-blue-500/50 rounded-2xl p-5 transition-all duration-300 group shadow-lg hover:shadow-blue-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-md">
                    {client.category.split(' ')[0]}
                  </span>
                  <CheckCircle2 size={16} className="text-green-400 opacity-80 group-hover:opacity-100" />
                </div>

                {client.logoUrl ? (
                  <div className="bg-white rounded-xl p-3 mb-4 h-16 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={client.logoUrl}
                      alt={client.name}
                      className="max-h-full max-w-full object-contain grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                    />
                  </div>
                ) : null}

                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors mb-1">
                  {client.name}
                </h3>
                <p className="text-xs text-gray-400 font-medium mb-3">
                  {client.subtext}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-700/40 text-[11px] text-gray-400 flex items-center justify-between">
                <span>{client.tag}</span>
                <span className="text-blue-400 font-semibold group-hover:underline">ISO Verified</span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal for Official Customer Sheet */}
      {showFullSheetModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 max-w-3xl w-full border border-slate-700 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowFullSheetModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-4">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <Image className="text-blue-400" size={22} />
                Official DLEC Eminent Customers Sheet
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Direct Line Engineering Corporation — Proactive Calibration Vendor
              </p>
            </div>

            <div className="bg-white rounded-2xl p-2 shadow-inner overflow-hidden">
              <img
                src="/clients/eminent-customers-sheet.jpg"
                alt="DLEC Eminent Customers Sheet"
                className="w-full h-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EminentCustomersSection;
