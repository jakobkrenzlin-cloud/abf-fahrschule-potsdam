import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Lead {
  id: string;
  created_at: string;
  name: string | null;
  phone: string | null;
  license_class: string | null;
  email: string | null;
  source: string | null;
  status: string | null;
}

const STATUS_OPTIONS = [
  { value: 'neu', label: 'neu', badge: 'bg-blue-100 text-blue-800 border-blue-300' },
  { value: 'kontaktiert', label: 'kontaktiert', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  { value: 'angemeldet', label: 'angemeldet ✓', badge: 'bg-green-100 text-green-800 border-green-300' },
  { value: 'verloren', label: 'verloren', badge: 'bg-gray-100 text-gray-700 border-gray-300' },
] as const;

const Admin = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  const checkAuthAndFetch = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/auth');
      return;
    }
    try {
      const response = await fetch(
        'https://jxxhrldcmwjnjqfpfeti.supabase.co/functions/v1/verify-admin',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        if (response.status === 401) { navigate('/auth'); return; }
        setHasAccess(false); setLoading(false); return;
      }
      const data = await response.json();
      if (!data.isAdmin) { setHasAccess(false); setLoading(false); return; }
      setHasAccess(true);
      fetchLeads();
    } catch {
      setHasAccess(false); setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const fetchLeads = async () => {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error) setLeads((data as Lead[]) || []);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const prev = leads;
    setLeads((cur) => cur.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) {
      setLeads(prev);
      toast({ title: 'Fehler', description: 'Status konnte nicht gespeichert werden.', variant: 'destructive' });
    }
  };

  const formatDate = (dateString: string) => new Date(dateString).toLocaleString('de-DE');

  const counts = STATUS_OPTIONS.reduce<Record<string, number>>((acc, opt) => {
    acc[opt.value] = leads.filter((l) => (l.status || 'neu') === opt.value).length;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Lade Kontaktanfragen...</p>
        </div>
      </div>
    );
  }

  if (hasAccess === false) {
    return (
      <div className="min-h-screen bg-background p-8 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <p className="text-lg text-destructive mb-4">
              Zugriff verweigert. Sie benötigen Admin-Rechte.
            </p>
            <Button onClick={handleLogout}>Abmelden</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-foreground">
            Kontaktanfragen ({leads.length})
          </h1>
          <Button onClick={handleLogout} variant="outline">
            Abmelden
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {STATUS_OPTIONS.map((opt) => (
            <span
              key={opt.value}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-semibold ${opt.badge}`}
            >
              {opt.label}: {counts[opt.value] ?? 0}
            </span>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Bitte Leads nicht löschen – stattdessen den Status setzen. „Angemeldet" fließt später als echte Conversion zurück zu Google Ads.
        </p>

        {leads.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground">
                Noch keine Kontaktanfragen eingegangen.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {leads.map((lead) => {
              const currentStatus = lead.status || 'neu';
              const statusMeta = STATUS_OPTIONS.find((o) => o.value === currentStatus) ?? STATUS_OPTIONS[0];
              return (
                <Card key={lead.id} className="border-2">
                  <CardHeader>
                    <CardTitle className="flex flex-wrap justify-between items-center gap-3">
                      <span className="flex items-center gap-3 flex-wrap">
                        <span>{lead.name || 'Unbekannt'}</span>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-xs font-semibold ${statusMeta.badge}`}>
                          {statusMeta.label}
                        </span>
                      </span>
                      <span className="text-sm font-normal text-muted-foreground">
                        {formatDate(lead.created_at)}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Telefon:</p>
                        <p className="text-lg">{lead.phone || 'Nicht angegeben'}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Führerscheinklasse:</p>
                        <p className="text-lg">{lead.license_class || 'Nicht angegeben'}</p>
                      </div>
                      {lead.email && (
                        <div>
                          <p className="text-sm font-semibold text-muted-foreground">E-Mail:</p>
                          <p className="text-lg">{lead.email}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-semibold text-muted-foreground">Quelle:</p>
                        <p className="text-lg">{lead.source || 'Unbekannt'}</p>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-semibold text-muted-foreground mb-2">Status setzen:</p>
                      <div className="flex flex-wrap gap-2">
                        {STATUS_OPTIONS.map((opt) => (
                          <Button
                            key={opt.value}
                            size="sm"
                            variant={currentStatus === opt.value ? 'default' : 'outline'}
                            onClick={() => updateStatus(lead.id, opt.value)}
                          >
                            {opt.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
