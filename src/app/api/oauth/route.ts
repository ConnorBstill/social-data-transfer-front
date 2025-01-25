import { NextRequest, NextResponse } from 'next/server';

import { ResponseBuilder } from '../../../lib/response-builder';

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const term = req.nextUrl.searchParams.get('term');


    return new NextResponse(ResponseBuilder({  }));
  } catch (err) {
    console.error('error in api/related-words', err);
    return new NextResponse(
      ResponseBuilder([], 'Error fetching word list', true),
    );
  }
};
