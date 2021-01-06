var pi = Math.PI,
    quarterPi = pi / 4,
    radians = pi / 180,
    abs = Math.abs,
    atan2 = Math.atan2,
    cos = Math.cos,
    sin = Math.sin;

export function sphericalArea(ring) {
  var n = ring.length;
  if (n < 3) return 0;
  var sum = 0,
      point = ring[n - 1],
      lambda0, lambda1 = point[0] * radians,
      phi1 = (point[1] * radians) / 2 + quarterPi,
      cosPhi0, cosPhi1 = cos(phi1),
      sinPhi0, sinPhi1 = sin(phi1);

  for (var i = 0; i < n; i++) {
    point = ring[i];
    lambda0 = lambda1, lambda1 = point[0] * radians;
    phi1 = (point[1] * radians) / 2 + quarterPi;
    cosPhi0 = cosPhi1, cosPhi1 = cos(phi1);
    sinPhi0 = sinPhi1, sinPhi1 = sin(phi1);

    // Spherical excess E for a spherical triangle with vertices: south pole,
    // previous point, current point.  Uses a formula derived from Cagnoli’s
    // theorem.  See Todhunter, Spherical Trig. (1871), Sec. 103, Eq. (2).
    // See https://github.com/d3/d3-geo/blob/master/README.md#geoArea
    var dLambda = lambda1 - lambda0,
        sdLambda = dLambda >= 0 ? 1 : -1,
        adLambda = sdLambda * dLambda,
        k = sinPhi0 * sinPhi1,
        u = cosPhi0 * cosPhi1 + k * cos(adLambda),
        v = k * sdLambda * sin(adLambda);
    sum += atan2(v, u);
  }

  return sum * 2;
}

export function sphericalRingArea(ring) {
  return abs(sphericalArea(ring));
}

export function sphericalTriangleArea(t) {
  return abs(sphericalArea(t));
}
