import Link from 'next/link'
import { NavbarProps } from 'sanity'
import { Card, Stack, Text, Box } from '@sanity/ui'

export function StudioNavbar(props: NavbarProps) {
  return (
    <Stack>
      <Card padding={1} tone="primary" radius={0}>
        <Box padding={1}>
            <Link href="/" className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2 hover:opacity-80 transition-opacity" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span>← Retour</span>
            </Link>
        </Box>
      </Card>
      {props.renderDefault(props)}
    </Stack>
  )
}