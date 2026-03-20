---
title: "Audiometry: Mobile Hearing Tests"
pubDate: 2024-08-01
updatedDate: 2024-08-01
show: false
tags: ["Sim2real","Isaacsim", "Robotics","ROS2"]
---

# Audiometry: Bringing Clinical Hearing Tests to Mobile

## The Application

Standard audiometry, the clinical process of measuring a person's hearing sensitivity across a range of frequencies, has traditionally required specialist equipment and a controlled environment. This project set out to replicate that process on a mobile phone, making hearing tests more accessible without sacrificing the precision that makes them clinically meaningful.

When I joined the project, the core application was largely built. My role was to extend it: implementing new features, diagnosing existing audio pipeline issues, and ensuring the output of the tests met the accuracy standards a medical application demands. I did this alone, over the course of two months.

## Stepping Into an Unfamiliar Domain

Audiometry sits at the intersection of software engineering and audio signal processing, a domain I had no prior exposure to. Before writing a single line of code, I had to understand the science well enough to reason about correctness.

A standard hearing test presents tones at specific frequencies and amplitudes, and records whether the patient can detect them. On dedicated clinical hardware, the output is tightly controlled. On a consumer smartphone, it is not. The phone's audio stack, the recording pipeline, the hardware speaker and headphone characteristics,all of these introduce variables that have to be understood and accounted for.

Frequency accuracy turned out to be the more tractable problem. Amplitude, the perceived loudness of the tone reaching the patient's ear, was where the real complexity lived.

## The Masking Noise Problem

One of the features I was tasked with implementing was automatic white noise generation in the non-test ear during examinations. This is a standard clinical technique called masking: by introducing calibrated noise to the ear not being tested, you prevent sound from crossing over and contaminating the result.

Getting this right required understanding not just how to generate white noise programmatically in Unity, but how to route audio to the correct channel, control its amplitude independently, and ensure it did not interfere with the test tone in the active ear. The implementation had to be precise, in audiometry an incorrectly masked test produces results that are not just inaccurate but potentially misleading in a clinical context.

## Chasing the Volume

The more demanding problem was amplitude calibration. The test tones were generating at the correct frequencies, but their actual loudness at the ear did not match the target values. This meant the test was asking patients to detect sounds at intensities they were not actually being presented with, a fundamental accuracy failure.

Tracing this required understanding the full signal chain: how the tone was generated in software, how the audio framework processed and mixed it, how the phone's volume level applied gain on top of that, and how all of these factors compounded by the time sound left the headphones. Each stage introduced a variable. Getting the output right meant accounting for all of them together.

The solution involved applying corrective filters to bring the amplitude into the correct range, compensating for the amplification applied by the device volume level, and validating the output against reference measurements. It was methodical, detail-oriented work, the kind where being slightly wrong is worse than being obviously wrong, because it is harder to detect.

## Learning Fast, Working Alone

Two months. One person. A domain I had never worked in before.

What made this project manageable was the same approach I have come to rely on across all my work: treat the unknown as a curriculum. I did not know digital audio signal processing, Unity audio APIs, or the clinical standards underpinning audiometry when I started. By the time I finished, I had enough working knowledge of all three to deliver features that functioned correctly in a medically meaningful sense.

Working alone sharpened that learning considerably. There was no one to defer to when something was unclear, every question had to be answered through research, experimentation, and reasoning from first principles. That pressure, while uncomfortable at times, accelerated my development in a way that collaborative environments rarely do.

## What I Took Away

- **Domain knowledge is part of the job.** Writing correct software for an audiometry application requires understanding audiometry. The engineering and the subject matter cannot be fully separated, especially in precision or safety-adjacent contexts.
- **Signal chains demand end-to-end thinking.** The amplitude problem could not be solved by looking at any single component in isolation. Understanding how each stage affected the next was the only way to reason about the output correctly.
- **Working alone builds a different kind of confidence.** Without a team to lean on, every decision was mine to make and mine to own. That responsibility, taken seriously, is one of the fastest ways to grow.
- **Two months is enough time to go from unfamiliar to capable.** Not expert, but capable. That transition, repeated across projects and domains, is what I think engineering growth actually looks like.

---

*Certain implementation details have been omitted in accordance with project confidentiality.*
