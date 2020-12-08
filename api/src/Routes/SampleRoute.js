import { Router } from 'express';

/** Sample router. */
const router = Router();

router.get( '/', ( req, res ) => res.status( 200 ).send( 'Sample Route' ));

export const SampleRoute = router;
