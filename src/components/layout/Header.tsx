import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={`${styles.header} glass-panel`}>
            <div className={`container ${styles.container}`}>
                <Link href="/" className={styles.logoWrapper}>
                    <Image
                        src="/images/logo_v2.png"
                        alt="JunSemi"
                        width={150}
                        height={40}
                        style={{ objectFit: 'contain', height: 'auto' }}
                        priority
                    />
                </Link>
                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        <li><Link href="/expertise" className={styles.navLink}>기술 역량 (Expertise)</Link></li>
                        <li><Link href="/cases" className={styles.navLink}>주요 실적 (Cases)</Link></li>
                        <li><Link href="/admin" className={styles.navLink} style={{ color: '#888', fontSize: '0.8rem' }}>[Admin]</Link></li>
                        <li><Link href="/contact" className={`btn-primary ${styles.contactBtn}`}>문의하기</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
