---
title: "Green Surgery: Medical Creation Fukushima Award"
pubDate: 2026-10-01
updatedDate: 2026-10-01
show: true 
description: "Highlights from our Green Surgery PoC awarded at Medical Creation Fukushima—featuring a modular computer vision (YOLO + ResNet18) and VLA robotics pipeline designed to automate surgical tool sorting and optimize hospital workflows."
tags: ["Robotics", "VLA/VLM", "SO101", "Computer Vision"]
---

After visiting Fukushima Medical University and speaking directly with doctors and medical staff, learning about their workflow for the surgical tool lifecycle was extraordinarily informative. Hearing firsthand about their daily challenges inspired deep respect for healthcare workers and gave our team a clear, impactful problem to tackle.

At the end of the day, our primary objective is saving time for doctors, nurses, and medical staff. Even shaving off a few minutes per surgery adds up significantly over time. We consider this project a success if the accumulated time saved allows even just one more patient to receive care during a full day's cycle.

During our discussions, medical staff highlighted several pain points in surgical tool management:

* Sorting and organizing complex sets of surgical instruments post-surgery.
* Identifying single-use tools versus reusable tools.
* Unnecessary sterilization of unused tools due to lack of itemized tracking.
* High potential for human error in inventory count and tracking.

---

## The PoC and Modular Pipeline

To address these challenges, we built a Proof of Concept (PoC) demonstrating a automated sorting, counting, and record-keeping system for surgical instruments.

Because every hospital operates with different inventory software, distinct toolsets, and customized lifecycles, flexibility is essential. The core strength of our PoC lies in its **modular architecture**, where each component of the vision and control pipeline can be updated or swapped independently:

Object Detection (YOLO) ➔ Classification (ResNet18) ➔ Pickup Policy (VLA)

### Decoupling Vision and Control

Rather than relying on a single Vision-Language-Action (VLA) model to implicitly handle both complex visual classification and spatial manipulation, we explicitly decoupled these tasks:

1. **Dedicated Computer Vision:** High-performing models (YOLO and ResNet18) take full responsibility for tool detection and fine-grained classification.
2. **Targeted VLA Action:** The VLA policy focuses exclusively on robotic pickup and manipulation logic.

This decoupling brings huge operational advantages:

* **Easier Dataset Creation:** Demonstrations and training episodes don't need to span minutes of multi-tool sorting. Instead, individual episodes last only a few seconds, ending as soon as a target tool is successfully picked up.
* **Component Interchangeability:** Hospitals or developers can easily swap in different state-of-the-art vision models or custom VLA control policies as technology evolves without retraining the entire system end-to-end. Or if only the vision part is necessary, then they can use those trained models only.

---

## Demonstrating High-Precision Classification

For our exhibition demonstration, rather than aiming for broad coverage across dozens of distinct tools, we chose to tackle one of the hardest edge cases: **distinguishing between two similarly sized scissors that are nearly identical to the human eye.**

By proving our vision pipeline can accurately differentiate subtly distinct tools and trigger precise robotic pickups, we showed that expanding the dataset to cover wider toolsets is primarily a function of time and data collection rather than a core architectural limitation.

---

## Demonstration & Media

Watch the live PoC demonstration video below:

[![Watch the PoC Demonstration Video](https://img.youtube.com/vi/SZ2F63tyc3s/maxresdefault.jpg)](https://www.youtube.com/watch?v=SZ2F63tyc3s)

For additional details about the award and the Medical Creation Fukushima event, check out the official press write-up on [Yakuji Nippo](https://www.yakuji.co.jp/entry140230.html).

---

## Looking Forward

Although the Green Surgery project is still in its early stages, the positive feedback we received from medical professionals at Medical Creation Fukushima validated our approach. With further dataset expansion, refined hardware integration, and deeper hospital collaboration, we are excited to keep building intelligent tools that lighten the operational burden on healthcare teams.
